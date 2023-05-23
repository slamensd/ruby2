window.onload = async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let userAddress;
    let contractAddress = "0x232765be70a5f0b49e2d72eee9765813894c1fc4";

    let erc1155Abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    let contract = new ethers.Contract(contractAddress, erc1155Abi, provider);

    document.getElementById("connectBtn").addEventListener("click", async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAddress = accounts[0];
            document.getElementById("walletAddress").innerText = `Connected: ${userAddress}`;
            console.log("Wallet connected:", userAddress);

            // Get balance of Token 6
            let tokenId = 6;
            let balance = await contract.balanceOf(userAddress, tokenId);
            document.getElementById("tokenBalance").innerText = `Token 6 Balance: ${balance.toString()}`;
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    });

    document.getElementById("verifyBtn").addEventListener("click", async () => {
        try {
            let tokenId = 6;
            let balance = await contract.balanceOf(userAddress, tokenId);
            console.log("Token balance:", balance.toString());

            if (balance > 0) {
                document.getElementById("verificationMessage").innerText = "Token Verified!";
                document.getElementById("hiddenMessage").innerText = "We start at zero, book one unfurled, Page one's second letter \"U\", into our world. To page three we turn, the fifth letter to peek, On this journey of ours, the clues we seek. Fast forward to eight, a letter to meet, Put them together, the word is complete. A three-letter puzzle, for your mind's keep, Seek, find, and unravel, in this mystery deep.";
            } else {
                document.getElementById("verificationMessage").innerText = "Error: Token not found in this wallet!";
            }
        } catch (error) {
            console.error("Error during token verification:", error);
        }
    });
};
