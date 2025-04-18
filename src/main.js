import { EthereumProvider } from "@walletconnect/ethereum-provider";

let provider;

async function connectWallet(chainId = "137") {
  provider = await EthereumProvider.init({
    projectId: "67c4292e272ac36fd0bc049335adf6b67",
    chains: [parseInt(chainId)],
    showQrModal: true,
    optionalChains: [1, 56, 137],
    methods: ["eth_sendTransaction", "eth_sign"],
    events: ["chainChanged", "accountsChanged"],
  });

  await provider.connect();

  const accounts = await provider.request({ method: "eth_accounts" });
  const chain = await provider.request({ method: "eth_chainId" });

  document.getElementById("walletAddress").innerText = accounts[0];
  document.getElementById("walletChain").innerText = parseInt(chain, 16);
}

document.getElementById("connectButton").addEventListener("click", () => {
  const chainId = document.getElementById("chainSelect").value;
  connectWallet(chainId);
});

