const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    // Deploys Marketplace.sol
    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, '')
        })

        it('has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'Marketplace')
        })
    })

    describe('items', async () => {

        let result, itemCount

        before(async () => {
            result = await marketplace.createItem('Milk', 'Natural dairy milk', web3.utils.toWei('1', 'Ether'), { from: seller })
            itemCount = await marketplace.itemCount()
        })
        it('creates item', async () => {
            //     // // SUCCESS
            assert.equal(itemCount, 1)
            //     console.log(result.logs)
            //     // const event = result.logs[0].args

            //     // assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            //     // assert.equal(event.name, 'IPhone X', 'name is correct')
            //     // assert.equal(event.price, '1000000000000000000', 'price is correct')
            //     // assert.equal(event.owner, seller, ' is correct')
            //     // assert.equal(event.purchased, false, 'purchased is correct')


            //     // // FAILURE: Product must have a name
            //     // await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected

            //     // // FAILURE: Product must have a price
            //     // await await marketplace.createProduct('IPhone X', 0, { from: seller }).should.be.rejected

        })
    })
})


// courier cannot create item
// address cannot be courier adrr