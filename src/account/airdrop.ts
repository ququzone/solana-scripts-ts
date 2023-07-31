import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { getBytes } from "ethers"

const main = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

    const key = getBytes(process.env.PRIVATE_KEY!)
    const keypair = Keypair.fromSecretKey(key)

    const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        LAMPORTS_PER_SOL * 3,
    )
    // @ts-ignore
    const result = await connection.confirmTransaction({
        signature: airdropSignature
    })

    console.log(`account ${keypair.publicKey.toBase58()} airdrop result: ${JSON.stringify(result)}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
