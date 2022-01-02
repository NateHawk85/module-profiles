export class ManageProfilesSettings extends FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            title: "Manage Profiles",
            id: "manage-profiles",
            template: "modules/module-profiles/templates/manage-profiles.hbs",
            resizable: true,
            width: 660,
        };
    }

    async _updateObject(event, formData) {
        return;
    }
}