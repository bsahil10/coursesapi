package org.codingwallah.emproject.repository;


import org.codingwallah.emproject.entity.InstanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InstanceRepository extends JpaRepository<InstanceEntity, Long> {
    //cutom method
    //List<EmployeeEntity> findByName(String name);
    //save, delete, finbyId , findall
}
