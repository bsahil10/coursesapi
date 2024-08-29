package org.codingwallah.emproject.services;

import java.util.List;
import org.codingwallah.emproject.model.Instance;

public interface InstanceService {
    String createInstance(Instance instance);
    List<Instance> readInstances();
    boolean deleteInstance(Long id);
    String updateInstance(Long id, Instance instance);
    Instance readInstance(Long id);
}
