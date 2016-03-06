describe('Rivets.Binding', function() {
  var model, el, view, binding, opts

  beforeEach(function() {
    rivets.prefix = 'data'
    adapter = rivets.adapters['.']

    el = document.createElement('div')
    el.setAttribute('data-text', 'obj.name')

  })

  it('adapts model with getter and setter', function() {
    model = {
      obj: {}
    };

    var name;

    Object.defineProperty(model.obj, "name", {
      configurable: true,
      enumerable: true,
      get: function() {
        return name + "!";
      },
      set: function(value) {
        name = value + "?";
      }
    });

    model.obj.name = "John Doe";
    view = rivets.bind(el, model);
    model.obj.name = "Jane Doe"
    name.should.be.exactly("Jane Doe?")
    el.innerText.should.be.exactly("Jane Doe?!")
  })

})
