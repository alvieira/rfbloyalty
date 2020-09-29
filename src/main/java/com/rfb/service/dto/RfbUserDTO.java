package com.rfb.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.rfb.domain.RfbUser} entity.
 */
public class RfbUserDTO implements Serializable {
    
    private Long id;

    private String userName;


    private Long homeLocationId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getHomeLocationId() {
        return homeLocationId;
    }

    public void setHomeLocationId(Long rfbLocationId) {
        this.homeLocationId = rfbLocationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfbUserDTO)) {
            return false;
        }

        return id != null && id.equals(((RfbUserDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RfbUserDTO{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", homeLocationId=" + getHomeLocationId() +
            "}";
    }
}
