# Object Types

<a name="ModuleProfile"></a>

## ModuleProfile

<p>A representation of a module profile configuration.</p>

**Kind**: global interface

| Property    | Type                            | Description                                                                          |
|-------------|---------------------------------|--------------------------------------------------------------------------------------|
| name | <code>string</code>             | <p>The name of the profile.</p>                                                      |
| modules | <code>Array.&lt;ModuleInfo&gt;</code> | <p>An Array of [ModuleInfo](#ModuleInfo) objects that are saved to this profile.</p> |

<a name="ModuleInfo"></a>

## ModuleInfo

<p>A representation of an installed module, and the surrounding information about it.</p>

**Kind**: global interface

| Property | Type                            | Description                                                                                                |
|----------|---------------------------------|------------------------------------------------------------------------------------------------------------|
| id       | <code>string</code>             | <p>The ID of the module in Foundry's internals.</p>                                                        |
| title    | <code>string \ undefined</code> | <p>(Optional) The Title of the module, most-often shown in the "Module Management" configuration list.</p> |
| isActive       | <code>boolean</code>            | <p>Whether the given module is active or not.</p>                                                          |
