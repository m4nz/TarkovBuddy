const Item = require('../models/Item');
const axios = require('axios');

module.exports.updateDb = (callback) => {
    console.log("Getting items...")

    axios({
        method: 'get',
        url: 'https://tarkov-market.com/api/v1/items/all',
        headers: {
            "x-api-key" : process.env.API_KEY
        }
    }).then(async function (res) {
        if (res.status === 200) {
            console.log("Updating database, this may take a while...")
            let items = res.data;
            let newItemAmnt = 0;
            let updatedItemAmnt = 0;

            for (let item of items) {
                const itemObj = new Item({
                    uid: item["uid"],
                    name: item["name"],
                    bsgId: item["bsgId"],
                    shortName: item["shortName"],
                    traderName: item["traderName"],
                    traderPrice: item["traderPrice"],
                    traderPriceCur: item["traderPriceCur"],
                    updated: item["updated"],
                    icon: item["icon"],
                    link: item["link"],
                    wikiLink: item["wikiLink"]
                })

                let itemFromDb = await Item.findOne( { uid: item["uid"] });

                if (itemFromDb) { // If item exists update it
                    await Item.findByIdAndUpdate(itemFromDb._id, {
                        uid: item["uid"],
                        name: item["name"],
                        bsgId: item["bsgId"],
                        shortName: item["shortName"],
                        traderName: item["traderName"],
                        traderPrice: item["traderPrice"],
                        traderPriceCur: item["traderPriceCur"],
                        updated: item["updated"],
                        icon: item["icon"],
                        link: item["link"],
                        wikiLink: item["wikiLink"]
                    });
                    updatedItemAmnt++;
                } else { // If item doesnt exist, add it!
                    await itemObj.save()
                    newItemAmnt++;
                }
            }

            console.log("Updated Database!");
            console.log(`Items updated: ${updatedItemAmnt}`);
            console.log(`Items added: ${newItemAmnt}`);

            callback(['success', updatedItemAmnt, newItemAmnt]);
        }
    }).catch(function (e) {
        console.log('error', e);
        callback(['error'])
    })
}