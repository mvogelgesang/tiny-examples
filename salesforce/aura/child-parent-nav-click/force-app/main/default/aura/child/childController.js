({
    onClick: function (component, event, helper) {
      var compEvent = component.getEvent("clickEvent");
      compEvent.setParams({
        menuId: component.get("v.id")
      });
      compEvent.fire();
    }
  });
  