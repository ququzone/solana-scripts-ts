import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js"
import { getBytes } from "ethers"

const main = async () => {
    const connection = new Connection(clusterApiUrl("devnet"))

    const key = getBytes(process.env.PRIVATE_KEY!)
    const keypair = Keypair.fromSecretKey(key)

    const info = await connection.getAccountInfo(
        keypair.publicKey
    )
    console.log(`account info: ${JSON.stringify(info)}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
