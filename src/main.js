import './style.css';
import { EthereumProvider } from "@walletconnect/ethereum-provider";

let provider;

async function connectWallet(chainId = "1") {
  provider = await EthereumProvider.init({
    projectId: "67c4292e22rac36fdcb04933a5df66b7", // dein echter V2 projectId
    chains: [parseInt(chainId)],
    optionalChains: [1, 56, 137],
    showQrModal: true,
    methods: ["eth_sendTransaction", "eth_sign", "personal_sign", "eth_signTypedData"],
    events: ["chainChanged", "accountsChanged"]
  });

  await provider.connect();

  const accounts = await provider.request({ method: "eth_accounts" });
  const chain = await provider.request({ method: "eth_chainId" });

  alert(`Wallet verbunden:\nAdresse: ${accounts[0]}\nChain-ID: ${chain}`);
}

document.getElementById("connectButton").addEventListener("click", () => {
  const chainId = document.getElementById("chainSelect").value;
  connectWallet(chainId);
});
