let charId: number = -1;
let auth: string = "";

//const endpoint: string = "http://localhost:5000/api";
const endpoint: string = "https://fuzzything44.xyz/DungeonThing/api";

function realMakeCall(requests: any[]): Promise<any[]> {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    let body: any = {
        requests: requests
    }
    if (charId > -1) {
        body.character = charId;
        body.auth = auth;
    }
    return fetch(endpoint, {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: header
    }).then(r => {
        if (r.ok) {
            return r.json()
        } else {
            return r.text().then(text => {
                if (text === "Invalid Authentication Token") {
                    charId = -1;
                }
                throw new Error(text);
            });
        }
    });
}

interface CallbackListElement {
    resolve: (data: any) => void;
    reject: (error: any) => void
    call: any;
}

export function setUser(id: number, authToken: string) {
    charId = id;
    auth = authToken;
}

export function playerId() { return charId; }

let callInProgress: boolean;
let callsToMake: CallbackListElement[] = [];
export function makeCall<T>(request: object): Promise<T | { error: string }> {
    return new Promise((resolve, reject) => {
        // Add to list of calls to make
        callsToMake.push({
            resolve: resolve,
            reject: reject,
            call: request
        });
        // If no call already in progress, set it to be.
        if (!callInProgress) {
            callInProgress = true;
            setTimeout(callResolver, 10);
        }
    })
}

function callResolver() {
    // After 10ms timeout (so we include other setTimeout(func, 0) calls, hopefully)
    // make the call and resolve all promises

    // Only send 25 requests at a time.
    let toMake = callsToMake.splice(0, 25);
    realMakeCall(toMake.map(call => call.call)).then(results => {
        results.forEach((result, index) => {
            if (toMake[index].call["api"] === "login" || toMake[index].call["api"] === "create_account") {
                charId = result.id;
                auth = result.auth_token;
            }
            toMake[index].resolve(result);
        });
    }).catch(error => {
        toMake.forEach((call) => {
            call.reject(error);
        });
    }).finally(() => {
        if (callsToMake.length > 0) {
            // Another 10ms delay incase the resolved promises add new calls that we could also handle.
            setTimeout(callResolver, 10);
        } else {
            callInProgress = false;
        }
    });
}

export const isLoggedIn = () => {
    return charId !== -1;
}