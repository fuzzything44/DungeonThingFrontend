interface FullItemInformation {
    name: string;
    imageFolder: string;
    description: string;
}

export function getItemInformation(id: number, data: number): FullItemInformation {
    switch (id) {
        case 1:
            return {
                name: "Rank up orb +" + data.toString(),
                imageFolder: "rank_orb",
                description: "This orb can be used to rank up equipment of the same rank.\n" +
                    "Rank orbs are acquired through destroying equipment."
            };
        case 2:
            return { name: "Reinforce coupon +" + data.toString(), imageFolder: "reinforce", description: "This is a coupon used to reinforce equipment, along with a small amount of mana. Higher rank coupons give a higher chance of success."};
        default:
            return { name: "Unknown item " + id.toString() + " +" + data.toString(), imageFolder: "", description: "???" };
    }
}