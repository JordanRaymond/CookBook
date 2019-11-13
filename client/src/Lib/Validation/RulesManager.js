import strategies from './rulesStrategies'

class RulesManager {
    constructor() {
        this.rules = {}
        
        return this
    }

    register(key, ruleStrategy) {
        this.rules[key] = ruleStrategy
    }

    init() {
        for (let strategy in strategies) {
            const key = strategies[strategy].ruleName
            this.register(key, strategies[strategy])
        }
    }

    invoke(key, value, args) {
        try{
            let rule = new this.rules[key]()
            const result = rule.validate(value, args)

            return result
        } catch(err) {
            console.error(`The ${key} rule does not exist or is not included.`)
        }      
    }
}

export default RulesManager