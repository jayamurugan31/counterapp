async function main() {
    const [deployer] = await ethers.getSigners(); // 👉 Add this line
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    console.log("Counter deployed to:", counter.target);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  