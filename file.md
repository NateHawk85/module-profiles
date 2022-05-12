# Object Types

<a name="ModuleProfile"></a>
## ModuleProfile

<p>A representation of a module profile configuration.</p>

**Kind**: global interface

| Property    | Type                            | Description                    |
|-------------|---------------------------------|--------------------------------|
| name | <code>string</code>             | <p>The name of the profile</p> |
| modules | <code>Array.&lt;ModuleInfo&gt;</code> | <p>An Array of [ModuleInfo](ModuleInfo) objects that are saved to this profile.</p>               |

<a name="ModuleInfo"></a>
## ModuleInfo

<p>A representation of an installed module, and the surrounding information about it.</p>

**Kind**: global interface

| Property | Type                            | Description                                                                                                |
|----------|---------------------------------|------------------------------------------------------------------------------------------------------------|
| id       | <code>string</code>             | <p>The ID of the module in Foundry's internals.</p>                                                        |
| title    | <code>string \ undefined</code> | <p>(Optional) The Title of the module, most-often shown in the "Module Management" configuration list.</p> |
| isActive       | <code>boolean</code>            | <p>Whether the given module is active or not.</p>                                                          |


## Functions

<dl>
<dt><a href="#getCurrentModuleConfiguration">getCurrentModuleConfiguration()</a> ⇒ <code>Array.&lt;ModuleInfo&gt;</code></dt>
<dd><p>Gets the currently active modules from the core game settings.</p></dd>
<dt><a href="#getAllProfiles">getAllProfiles()</a> ⇒ <code>Array.&lt;ModuleProfile&gt;</code></dt>
<dd><p>Gets all saved module profiles from the game settings.</p></dd>
<dt><a href="#getActiveProfile">getActiveProfile()</a> ⇒ <code>ModuleProfile</code></dt>
<dd><p>Gets the saved, currently-active module profile from the game settings.</p></dd>
<dt><a href="#getProfileByName">getProfileByName(profileName)</a> ⇒ <code>ModuleProfile</code> | <code>undefined</code></dt>
<dd><p>Gets a saved profile from the game settings with the corresponding name.</p></dd>
<dt><a href="#exportAllProfiles">exportAllProfiles()</a> ⇒ <code>string</code></dt>
<dd><p>Gets the array of saved profiles from the game settings in JSON format.</p></dd>
<dt><a href="#exportProfileByName">exportProfileByName(profileName)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Gets a saved profile from the game settings in JSON format.</p></dd>
<dt><a href="#createProfile">createProfile(profileName, modules)</a> ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code></dt>
<dd><p>Creates a new [ModuleProfile](ModuleProfile) in the game settings.</p></dd>
<dt><a href="#importProfiles">importProfiles(json)</a> ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code></dt>
<dd><p>Creates a [ModuleProfile](ModuleProfile) or multiple module profiles out of a JSON representation of those profiles.</p></dd>
<dt><a href="#activateProfile">activateProfile(profileName)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Activates the profile with the given name, then reloads the page.</p></dd>
<dt><a href="#saveChangesToProfile">saveChangesToProfile(profileName, modules)</a> ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code></dt>
<dd><p>Saves the current profile settings to an existing profile.</p></dd>
<dt><a href="#deleteProfile">deleteProfile(profileName)</a> ⇒ <code>Promise.&lt;(Array.&lt;ModuleProfile&gt;|undefined)&gt;</code></dt>
<dd><p>Deletes the profile with the given name. When the currently-active profile is deleted, the first profile is selected.</p></dd>
<dt><a href="#resetProfiles">resetProfiles()</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Reset all module profiles to the default values. WARNING: Doing this leads to unrecoverable data loss.</p></dd>
</dl>

<a name="getCurrentModuleConfiguration"></a>

## getCurrentModuleConfiguration() ⇒ <code>Array.&lt;ModuleInfo&gt;</code>
<p>Gets the currently active modules from the core game settings.</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;ModuleInfo&gt;</code> - <ul>
<li>The currently-active module configuration.</li>
</ul>  
<a name="getAllProfiles"></a>

## getAllProfiles() ⇒ <code>Array.&lt;ModuleProfile&gt;</code>
<p>Gets all saved module profiles from the game settings.</p>

**Kind**: global function  
<a name="getActiveProfile"></a>

## getActiveProfile() ⇒ <code>ModuleProfile</code>
<p>Gets the saved, currently-active module profile from the game settings.</p>

**Kind**: global function  
**Returns**: <code>ModuleProfile</code> - <ul>
<li>The currently-active module profile.</li>
</ul>  
<a name="getProfileByName"></a>

## getProfileByName(profileName) ⇒ <code>ModuleProfile</code> \| <code>undefined</code>
<p>Gets a saved profile from the game settings with the corresponding name.</p>

**Kind**: global function  
**Returns**: <code>ModuleProfile</code> \| <code>undefined</code> - <ul>
<li>The module profile with the given name, or <code>undefined</code> if none exists.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the profile to return.</p> |

<a name="exportAllProfiles"></a>

## exportAllProfiles() ⇒ <code>string</code>
<p>Gets the array of saved profiles from the game settings in JSON format.</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>The JSON representation of the profile.</li>
</ul>  
<a name="exportProfileByName"></a>

## exportProfileByName(profileName) ⇒ <code>string</code> \| <code>undefined</code>
<p>Gets a saved profile from the game settings in JSON format.</p>

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - <ul>
<li>The JSON representation of the profile, or <code>undefined</code> if none exists.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the profile to return.</p> |

<a name="createProfile"></a>

## createProfile(profileName, modules) ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code>
<p>Creates a new [ModuleProfile](ModuleProfile) in the game settings.</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code> - <ul>
<li>The new Array of [ModuleProfile](ModuleProfile)s.</li>
</ul>  
**Throws**:

- <p>Error - When a profile exists with the given profileName</p>


| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the profile to create.</p> |
| modules | <code>Array.&lt;ModuleInfo&gt;</code> | <p>The Array of [ModuleInfo](ModuleInfo) objects that represent each module's activation status.</p> |

<a name="importProfiles"></a>

## importProfiles(json) ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code>
<p>Creates a [ModuleProfile](ModuleProfile) or multiple module profiles out of a JSON representation of those profiles.</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code> - <ul>
<li>The saved array of module profiles in the game settings.</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | <p>The JSON representation of a [ModuleProfile](ModuleProfile) or an Array of [ModuleProfile](ModuleProfile)[] objects.</p> |

<a name="activateProfile"></a>

## activateProfile(profileName) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Activates the profile with the given name, then reloads the page.</p>

**Kind**: global function  
**Throws**:

- <code>Error</code> <ul>
<li>When profile name does not exist.</li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the module profile to load.</p> |

<a name="saveChangesToProfile"></a>

## saveChangesToProfile(profileName, modules) ⇒ <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code>
<p>Saves the current profile settings to an existing profile.</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;ModuleProfile&gt;&gt;</code> - <ul>
<li>The new Array of module profiles.</li>
</ul>  
**Throws**:

- <p>Error - When a profile name is passed and no profiles exist with that name.</p>


| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the profile to update.</p> |
| modules | <code>Array.&lt;ModuleInfo&gt;</code> | <p>The Array of [ModuleInfo](ModuleInfo) objects that represent each module's activation status.</p> |

<a name="deleteProfile"></a>

## deleteProfile(profileName) ⇒ <code>Promise.&lt;(Array.&lt;ModuleProfile&gt;\|undefined)&gt;</code>
<p>Deletes the profile with the given name. When the currently-active profile is deleted, the first profile is selected.</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array.&lt;ModuleProfile&gt;\|undefined)&gt;</code> - <ul>
<li>The resulting value of the updated profiles setting, or <code>undefined</code> if no profiles remain.</li>
</ul>  
**Throws**:

- <code>Error</code> <ul>
<li>When no profile with the given name exists.</li>
</ul>


| Param | Type | Description |
| --- | --- | --- |
| profileName | <code>string</code> | <p>The name of the profile to delete.</p> |

<a name="resetProfiles"></a>

## resetProfiles() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Reset all module profiles to the default values. WARNING: Doing this leads to unrecoverable data loss.</p>

**Kind**: global function  
