var helpers = {
    name: 'Stefan',
    getMeMyName: function() {
        return this.processName(this.name)
    },
    processName: function(name) {
        return name.toUpperCase()
    }
}

helpers.getMeMyName() //'STEFAN'



var brokenHelpers = {
    name: 'Stefan',
    getMeMyName: function() {
        return (function() {
            return this.processName(this.name)
        })
    },
    processName: function(name) {
        return name.toUpperCase()
    }
}

brokenHelpers.getMeMyName() //undefined



var fixedHelpers = {
    name: 'Stefan',
    getMeMyName: function() {
        var that = this
        return (function() {
            return that.processName(that.name)
        })
    },
    processName: function(name) {
        var name = name || ''
        return name.toUpperCase()
    }
}

fixedHelpers.getMeMyName() //'STEFAN'


var es6Helpers = {
    name: 'Stefan',
    getMeMyName: function() {
        return (() => {
            return this.processName(this.name)
        })
    },
    processName: function(name) {
        var name = name || ''
        return name.toUpperCase()
    }
}

es6Helpers.getMeMyName() //'STEFAN'


