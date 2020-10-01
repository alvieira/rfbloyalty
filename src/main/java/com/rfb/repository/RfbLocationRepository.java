package com.rfb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rfb.domain.RfbLocation;

/**
 * Spring Data  repository for the RfbLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfbLocationRepository extends JpaRepository<RfbLocation, Long> {
	
	List<RfbLocation> findAllByRunDayOfWeek(Integer dayOfWeek);

    RfbLocation findByLocationName(String name);
}
