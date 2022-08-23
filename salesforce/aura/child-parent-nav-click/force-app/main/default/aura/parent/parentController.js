({
    handleChildComponentClickEvent: function (component, event, helper) {
      var valueFromChild = event.getParam("menuId");
      component.getSuper().navigate(valueFromChild);
    }
  });
  