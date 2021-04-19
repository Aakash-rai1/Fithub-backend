// use the path of your model
const Fav = require('../models/addFav');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/Fithub';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Checkout Schema test anything', () => {
    // the code below is for insert testing
    it('Checkout testing anything', () => {
        const fav = {
            'userId': 'test',
            'productId': 'test'
           
        };

        return Fav.create(fav)
            .then((pro_ret) => {
                expect(pro_ret.userId).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return Fav.findOneAndUpdate({ _id: Object('607d622b39b9b33b18e9aab0') },
            { $set: { userId: 'test' } })
            .then((pp) => {
                expect(pp.userId).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Fav.deleteOne({_id:"607d622b39b9b33b18e9aab0"});
        expect(status.ok).toBe(1);
    })

    

})