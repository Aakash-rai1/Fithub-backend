// use the path of your model
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');
// use the new name of the database
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
describe('Register Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', () => {
        const admin = {
            'fname': 'dummy name',
            'lname': 'dummy name',
            'email': 'dummy1232@gmail.com',
            'password': "dummy"
            
        };

        return Admin.create(admin)
            .then((pro_ret) => {
                expect(pro_ret.fname).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Admin.findOneAndUpdate({ _id: Object('607d622a2f4db012d06ed683') },
            { $set: { fname: 'dummy name' } })
            .then((pp) => {
                expect(pp.fname).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Admin.deleteOne({_id: '607d622a2f4db012d06ed683'});
        expect(status.ok).toBe(1);
    })
})