package org.codingwallah.emproject.controller;

import org.codingwallah.emproject.model.Instance;
import org.codingwallah.emproject.services.InstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/instances")
public class InstanceController {

    @Autowired
    private InstanceService instanceService;

    @GetMapping
    public List<Instance> getAllInstances() {
        return instanceService.readInstances();
    }

    @GetMapping("/{id}")
    public Instance getInstanceById(@PathVariable Long id) {
        return instanceService.readInstance(id);
    }

    @PostMapping
    public String createInstance(@RequestBody Instance instance) {
        return instanceService.createInstance(instance);
    }

    @DeleteMapping("/{id}")
    public String deleteInstance(@PathVariable Long id) {
        if (instanceService.deleteInstance(id))
            return "Deleted Successfully";
        return "Instance Not Found";
    }

    @PutMapping("/{id}")
    public String updateInstance(@PathVariable Long id, @RequestBody Instance instance) {
        return instanceService.updateInstance(id, instance);
    }
}
