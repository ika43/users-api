## _Users API_
------

GET - ``/api/v0.1/users``

#### Query String fields
<table>
  <tr>
    <th>Field</th>
    <th>Description</th>
    <th>Type</th>
    <th>Data type</th>
  </tr>
  <tr>
    <td>limit</td>
    <td>Specify to retrieve number of users by given value.</td>
    <td>Optional</td>
    <td>Number</td>
  </tr>
  <tr>
    <td>from</td>
    <td>Specify to retrieve users started from given number (for pagination). Default is 0.</td>
    <td>Optional</td>
    <td>Number</td>
  </tr>
  <tr>
    <td>search</td>
    <td>Users name or email. Can search for partial name or email.</td>
    <td>Optional</td>
    <td>String</td>
  </tr>
  <tr>
    <td>sort</td>
    <td>Can sort by name or email.</td>
    <td>Optional</td>
    <td>String [name|email]</td>
  </tr>
  <tr>
    <td>order</td>
    <td>Can order desc or asc. Default is asc.</td>
    <td>Optional</td>
    <td>String [desc|asc]</td>
  </tr>
</table>

### Examples

``curl localhost:3000/api/v0.1/users``


``curl localhost:3000/api/v0.1/users?search=well&sort=email&order=desc``
