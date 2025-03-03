import SupplyChain from "./contracts/SupplyChain.json"; 

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SupplyChain.networks[networkId];
  const instance = new web3.eth.Contract(
    SupplyChain.abi,
    deployedNetwork && deployedNetwork.address
  );
  return instance;
};

export default getContract;
