const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
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
            itemCount = await marketplace.itemCount();
        })



        it('creates item', async () => {
            assert.equal(itemCount, 1)
        })
    })
})

// courier cannot create item
// address cannot be courier adrr