let charId: number = -1;
let auth: string = "";

let endpoint: string = "https://fuzzything44.xyz/DungeonThing/api"

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
            return r.text().then(text => { throw new Error(text); });
        }
    });
}

interface CallbackListElement {
    resolve: (data: any) => void;
    reject: (error: any) => void
    call: any;
}

let callsToMake: CallbackListElement[] = [];
export function makeCall<T>(request: object): Promise<T | { error: string }> {
    return new Promise((resolve, reject) => {
        // Add to list of calls to make
        callsToMake.push({
            resolve: resolve,
            reject: reject,
            call: request
        });
        // If list was empty, add a resolver
        if (callsToMake.length === 1) {
            setTimeout(() => {
                // After 10ms timeout (so we include other setTimeout(func, 0) calls, hopefully)
                // make the call and resolve all promises

                let toMake = callsToMake;
                callsToMake = [];
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
                });
            }, 10);
        }
    })
}

export const isLoggedIn = () => {
    return charId !== -1;
}