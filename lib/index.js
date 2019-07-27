module.exports = options => {

    if (!options || typeof (options) !== 'object')
        throw new Error("Options must be specified")
    else if (!options.key || typeof (options.key) !== 'string')
        throw new Error("The key to be validated must be specified and must be a string")

    return async (ctx, next) => {
        try {
            if (ctx.state.user[options.key])
                await next()
            else {
                ctx.status = 403
                return ctx.body = { error: "not authorized" }
            }
        }
        catch (error) {
            console.log(error)
            ctx.status = 500
            ctx.body = { error: "internal error" }
        }
    }
}