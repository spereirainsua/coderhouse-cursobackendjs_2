import { Command } from "commander"

const args = new Command()

args
    .option("--db <db>", "Persistence Mongo/FS", "FS")
    .option("--mode <mode>", "Mode prod/dev/test", "prod")

args.parse()

export default args.opts()