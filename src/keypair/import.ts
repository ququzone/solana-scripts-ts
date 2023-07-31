import { Keypair } from "@solana/web3.js"
import { getBytes } from "ethers"

const main = async () => {
    const key = getBytes(process.env.PRIVATE_KEY!)
    const keypair = Keypair.fromSecretKey(key)

    console.log(`Generated key: ${keypair.publicKey.toBase58()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
