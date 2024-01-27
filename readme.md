## API Reference

### Disclimer :

this API need your own MongoDB Connection String, where usually we put it inside `.env` file.

---

### Get all Habit

```http
 GET : /habitslist
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `---`     | `string` | Showing All Habit colection |

---

### Create new habit

```http
 POST: /habits
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `---`     | `string` | Showing All Habit colection |

---

### Update Habit

```http
  PUT: /habits/:habitId/completed
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `habitId` | `string` | **Required**. Id of habit to fetch |

---

### Update Habit by Day

updated habit where only completed , and day the habit was completed

```http
  PUT: /habits/:habitId/completed/:day
```

| Parameter        | Type     | Description                                |
| :--------------- | :------- | :----------------------------------------- |
| `habitId`, `day` | `string` | **Required**. Id of habit and Day to fetch |

---

### Delete Habit

Delete habit where you thing it has done, and no need to repeat

```http
  DELETE: /habits/:habitId
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `habitId` | `string` | **Required**. Id of habit to fetch |
