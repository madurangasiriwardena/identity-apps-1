/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ResourceTab } from "@wso2is/react-components";
import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { AlertInterface, BasicProfileInterface } from "../../models";
import { addAlert } from "../../store/actions";
import { UserProfile } from "./user-profile";
import { UserRolesList } from "./user-roles";

interface EditUserPropsInterface {
    user: BasicProfileInterface;
    handleUserUpdate: (userId: string) => void;
}

/**
 * Application edit component.
 *
 * @return {JSX.Element}
 */
export const EditUser: FunctionComponent<EditUserPropsInterface> = (
    props: EditUserPropsInterface
): JSX.Element => {

    const {
        user,
        handleUserUpdate,
    } = props;
    const dispatch = useDispatch();

    const handleAlerts = (alert: AlertInterface) => {
        dispatch(addAlert(alert));
    };

    const panes = () => ([
        {
            menuItem: "Profile",
            render: () => (
                <ResourceTab.Pane attached={ false }>
                    <UserProfile
                        onAlertFired={ handleAlerts }
                        user={ user }
                        handleUserUpdate={ handleUserUpdate }
                    />
                </ResourceTab.Pane>
            ),
        },
        {
            menuItem: "Roles",
            render: () => (
                <ResourceTab.Pane attached={ false }>
                    <UserRolesList
                        onAlertFired={ handleAlerts }
                        user={ user }
                        handleUserUpdate={ handleUserUpdate }
                    />
                </ResourceTab.Pane>
            ),
        },
    ]);

    return (
        <ResourceTab
            panes={ panes() }
        />
    );
};
