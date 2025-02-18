const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
    it("should add a product", async () => {
        const instance = await SupplyChain.deployed();
        await instance.addProduct("Laptop", 1000, { from: accounts[0] });
        const product = await instance.getProduct(1);
        assert.equal(product.name, "Laptop");
        assert.equal(product.price, 1000);
    });

    it("should transfer a product", async () => {
        const instance = await SupplyChain.deployed();
        await instance.transferProduct(1, accounts[1], { from: accounts[0] });
        const product = await instance.getProduct(1);
        assert.equal(product.owner, accounts[1]);
    });
});
