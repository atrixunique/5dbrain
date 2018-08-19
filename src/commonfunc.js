function clog(msg, typeStr) {
    this.$root.eventHub.$emit('command-log', {text: msg, type: typeStr});
}

export {
    clog
}