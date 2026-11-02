# Concerto API

Returns a single recording by its ID, including its musical period and length.

- **Version:** 1.0.0
- **Base URL:** `https://api.concerto.test`

## Endpoints

### Recordings

- [GET /recordings](#get-recordings): Search recordings
- [GET /recordings/{id}](#get-recordingsid): Get one recording

### Playlists

- [POST /playlists](#post-playlists): Create a playlist
- [GET /playlists/{id}](#get-playlistsid): Get a playlist
- [POST /playlists/{id}/tracks](#post-playlistsidtracks): Add a recording to a playlist
- [DELETE /playlists/{id}/tracks/{recording_id}](#delete-playlistsidtracksrecording_id): Remove a recording from a playlist

## GET /recordings

Search recordings

Returns recordings in the catalogue. Filters can be combined.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| composer | query | string | no | Only recordings of works by this composer |
| period | query | string | no | Only recordings from this musical period, such as Baroque or Romantic |
| limit | query | integer | no | Maximum number of results (default 10) |

### Example request

```bash
curl 'https://api.concerto.test/recordings?composer=Bach'
```

### Responses

#### 200: A list of recordings

```json
[
  {
    "composer": "J. S. Bach",
    "id": 21,
    "performer": "Clara Vance",
    "work": "Goldberg Variations, BWV 988",
    "year": 2019
  },
  {
    "composer": "J. S. Bach",
    "id": 22,
    "performer": "Northgate Chamber Players",
    "work": "Brandenburg Concerto No. 3, BWV 1048",
    "year": 2021
  }
]
```

## GET /recordings/{id}

Get one recording

Returns a single recording by its ID.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| id | path | integer | yes | The recording's id |

### Example request

```bash
curl 'https://api.concerto.test/recordings/21'
```

### Responses

#### 200: Recording found

```json
{
  "composer": "J. S. Bach",
  "duration_seconds": 2745,
  "id": 21,
  "performer": "Clara Vance",
  "period": "Baroque",
  "work": "Goldberg Variations, BWV 988",
  "year": 2019
}
```

#### 404: No recording with that id

## POST /playlists

Create a playlist

Creates a new, empty playlist. Add recordings to it afterwards.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| name | body | string | yes | The playlist's title, shown as listeners |
| description | body | string | no | A short note about the playlist, such as its mood or occassion |

### Example request

```bash
curl -X POST 'https://api.concerto.test/playlists' \
  -H 'Content-Type: application/json' \
  -d '{"description": "Gentle music for a slow start", "name": "Sunday morning baroque"}'
```

### Responses

#### 201: Playlist created

```json
{
  "description": "Gentle music for a slow start",
  "id": 521,
  "name": "Sunday morning baroque"
}
```

#### 400: Name is missing

```json
{
  "error": "name is required"
}
```

## GET /playlists/{id}

Get a playlist

Returns a playlist with its recordings, in playing order, and its total length.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| id | path | integer | yes | The playlist's id |

### Example request

```bash
curl 'https://api.concerto.test/playlists/521'
```

### Responses

#### 200: Playlist found

```json
{
  "description": "Gentle music for a slow start",
  "id": 521,
  "name": "Sunday morning baroque",
  "total_duration_seconds": 3405,
  "tracks": [
    {
      "composer": "J. S. Bach",
      "duration_seconds": 2745,
      "recording_id": 21,
      "work": "Goldberg Variations, BWV 988"
    },
    {
      "composer": "J. S. Bach",
      "duration_seconds": 660,
      "recording_id": 22,
      "work": "Brandenburg Concerto No. 3, BWV 1048"
    }
  ]
}
```

#### 404: No playlist with that id

## POST /playlists/{id}/tracks

Add a recording to a playlist

Add a recording to the end of a playlist.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| id | path | integer | yes | The playlist's id |
| recording_id | body | integer | yes | The recording to add |

### Example request

```bash
curl -X POST 'https://api.concerto.test/playlists/521/tracks' \
  -H 'Content-Type: application/json' \
  -d '{"recording_id": 23}'
```

### Responses

#### 201: Recording added to playlist

```json
{
  "id": 521,
  "position": 3,
  "recording_id": 23
}
```

#### 404: Playlist or recording not found

#### 409: Recording is already in the playlist

## DELETE /playlists/{id}/tracks/{recording_id}

Remove a recording from a playlist

Removes a recording from a playlist. The recordings after it move up one place.

### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| id | path | integer | yes | The playlist id |
| recording_id | path | integer | yes | The recording to remove |

### Example request

```bash
curl -X DELETE 'https://api.concerto.test/playlists/521/tracks/23'
```

### Responses

#### 204: Recording removed

#### 404: Playlist not found or the recording isn't in it
