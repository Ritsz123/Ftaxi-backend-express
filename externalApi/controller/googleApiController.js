const got = require('got')
const { success, failure } = require('../../response');

searchPlace = async (req, res) => {
    try {
        let billingMapKey = process.env.GOOGLE_MAP_KEY;
        let searchQuery = req.query.place;
        if (req.query.place == null) {
            return res.status(401).json(failure('search query not provided'))
        }
        let response = await got(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${billingMapKey}&sessiontoken=123254251&components=country:in`)
        return res.json(success('ok', JSON.parse(response.body)))
    } catch (err) {
        console.log(err)
    }
}

module.exports = { searchPlace }