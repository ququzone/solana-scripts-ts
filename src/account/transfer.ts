import * as web3 from "@solana/web3.js"
import { decodeBase58, encodeBase58, getBytes } from "ethers"
import * as nacl from "tweetnacl"

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

    const key = getBytes(process.env.PRIVATE_KEY!)
    const keypair = web3.Keypair.fromSecretKey(key)

    // create simple transaction
    const latestBlock = await connection.getLatestBlockhash()
    const transaction = new web3.Transaction({
        blockhash: latestBlock.blockhash,
        lastValidBlockHeight: latestBlock.lastValidBlockHeight,
        feePayer: keypair.publicKey,     
    })

    // add an instruction to transfer lamports
    transaction.add(
        web3.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: new web3.PublicKey("FXx2PYZeRrmQyxCGk3WM9ZnRBAdH2HFAQVAoAXggs2YU"),
            lamports: 1000
        }),
    )
    const transactionBuffer = transaction.serializeMessage()
    const signature = nacl.sign.detached(transactionBuffer, keypair.secretKey)

    transaction.addSignature(keypair.publicKey, Buffer.from(signature))
    console.log(`The signature were verifed: ${transaction.verifySignatures()}`)

    const rawTransaction = transaction.serialize()

    const result = await web3.sendAndConfirmRawTransaction(connection, rawTransaction, {
        signature: encodeBase58(signature),
        blockhash: latestBlock.blockhash,
        lastValidBlockHeight: latestBlock.lastValidBlockHeight,
    })
    console.log(`Transfer result: ${JSON.stringify(result)}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
