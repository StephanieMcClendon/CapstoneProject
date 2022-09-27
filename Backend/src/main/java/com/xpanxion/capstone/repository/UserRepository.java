package com.xpanxion.capstone.repository;

import com.xpanxion.capstone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>
{


}

