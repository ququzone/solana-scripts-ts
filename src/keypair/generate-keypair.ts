import { Keypair } from "@solana/web3.js"

const main = async () => {
    const keypair = Keypair.generate()

    console.log(`Generated key: ${keypair.secretKey}`)
    console.log(`Generated key: ${keypair.publicKey.toBase58()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
