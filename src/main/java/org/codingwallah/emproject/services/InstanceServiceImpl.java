package org.codingwallah.emproject.services;

import java.util.ArrayList;
import java.util.List;
import org.codingwallah.emproject.entity.InstanceEntity;
import org.codingwallah.emproject.model.Instance;
import org.codingwallah.emproject.repository.InstanceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstanceServiceImpl implements InstanceService {

    @Autowired
    private InstanceRepository instanceRepository;

    @Override
    public String createInstance(Instance instance) {
        InstanceEntity instanceEntity = new InstanceEntity();
        BeanUtils.copyProperties(instance, instanceEntity);
        instanceRepository.save(instanceEntity);
        return "Instance saved successfully";
    }

    @Override
    public List<Instance> readInstances() {
        List<InstanceEntity> instanceEntities = instanceRepository.findAll();
        List<Instance> instances = new ArrayList<>();
        for (InstanceEntity entity : instanceEntities) {
            Instance instance = new Instance();
            BeanUtils.copyProperties(entity, instance);
            instances.add(instance);
        }
        return instances;
    }

    @Override
    public Instance readInstance(Long id) {
        InstanceEntity instanceEntity = instanceRepository.findById(id).get();
        Instance instance = new Instance();
        BeanUtils.copyProperties(instanceEntity, instance);
        return instance;
    }

    @Override
    public boolean deleteInstance(Long id) {
        InstanceEntity instanceEntity = instanceRepository.findById(id).get();
        instanceRepository.delete(instanceEntity);
        return true;
    }

    @Override
    public String updateInstance(Long id, Instance instance) {
        InstanceEntity existingInstance = instanceRepository.findById(id).get();
        BeanUtils.copyProperties(instance, existingInstance);
        instanceRepository.save(existingInstance);
        return "Instance updated successfully";
    }
}
