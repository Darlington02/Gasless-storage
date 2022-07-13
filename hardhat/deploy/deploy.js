const main = async () => {
    const Forwarder = await hre.ethers.getContractFactory("MinimalForwarder")
    const forwarder = await Forwarder.deploy();
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(forwarder.address, "hello");
    await greeter.deployed();
    console.log("Greeter Contract deployed to:", greeter.address);
    console.log("Forwarder Contract deployed to:", forwarder.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
