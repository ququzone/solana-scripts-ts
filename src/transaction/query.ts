import * as web3 from "@solana/web3.js"

const getTransactions = async(address: string, numTx: number) => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

    const pubKey = new web3.PublicKey(address);
    let transactionList = await connection.getSignaturesForAddress(pubKey, {limit:numTx});
    
    //Add this code
    let signatureList = transactionList.map(transaction=>transaction.signature);
    let transactionDetails = await connection.getParsedTransactions(signatureList, {maxSupportedTransactionVersion:0});
    //--END of new code 

    transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime!*1000);
        const transactionInstructions = transactionDetails[i]!.transaction.message.instructions;
        console.log(`Transaction No: ${i+1}`);
        console.log(`Signature: ${transaction.signature}`);
        console.log(`Time: ${date}`);
        console.log(`Status: ${transaction.confirmationStatus}`);
        transactionInstructions.forEach((instruction, n)=>{
            console.log(`---Instructions ${n+1}: ${instruction.programId.toString()}`);
        })
        console.log(("-").repeat(20));
    })
}

getTransactions("FXx2PYZeRrmQyxCGk3WM9ZnRBAdH2HFAQVAoAXggs2YU", 10)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
