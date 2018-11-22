import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-dark text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                {/*<img
                  className="rounded-circle"
                  src={}
                  alt=""
                />*/}
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="lead text-center">
                {isEmpty(profile.employer) ? null : (
                  <span>at {profile.employer}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
