const _products = {
	"yangbinbin":{

	}
}

export default {
  getUser (cb) {
    setTimeout(() => cb(_products), 100)
  }
}