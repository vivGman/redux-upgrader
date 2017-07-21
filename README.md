Redux Upgrader
========

Описание
--------
Утилита, позволяющая упростить и формализовать работу стандартных экшнов и редюсеров, а так же предназначеных для взаимодействия с API

Actions
------------------------

Методы
* `actionCreator` - универсальный экшн криэйтор
* `ApiAction` - конструктор объекта, содержащего типы экшнов для взаимодействия с api
* `ApiActions` - конструктор набора объектов ApiAction

### actionCreator

Параметры:
* `type` - тип экшна (обязательный)
* `data` - данные, передаваемые в экшн
* `params` - массив дополнительных параметрых, используются по усмотрению программиста

```javascript
dispatch(
    actionCreator('SET_USER_NAME', 'Вася')
)
```

### ApiAction

Параметры:
* `name` - имя запроса (обязательный)
* `traceStatus` - флаг, сообщающий о том будет ли отслеживаться статус выполнения запроса

```javascript
new ApiAction('SET_TODO')
```

```json
{
    "REQUEST": "SET_TODO_REQUEST",
    "SUCCESS": "SET_TODO_SUCCESS",
    "FAILURE": "SET_TODO_FAILURE"
}
```

### ApiActions

Параметры:
* `names` - имена запросов (обязательный)

```javascript
new ApiActions('SET_TODO', 'DEL_TODO')
```

```json
{
    "SET_TODO": {
        "REQUEST": "SET_TODO_REQUEST",
        "SUCCESS": "SET_TODO_SUCCESS",
        "FAILURE": "SET_TODO_FAILURE"
    },
    "DEL_TODO": {
        "REQUEST": "DEL_TODO_REQUEST",
        "SUCCESS": "DEL_TODO_SUCCESS",
        "FAILURE": "DEL_TODO_FAILURE"
    }
}
```


Reducers
------------------------

Методы
* `boundReducer` - возвращает функцию - редюсер, которая проверяет совпадение текущего события с указанным и записывает данные в state из поля `action.data`
* `boundApiReducer` - возвращает функцию - редюсер, обрабатывающую все стадии выполнения запроса к api

### boundReducer

Параметры:
* `type` - тип экшна (обязательный)
* `Constructor` - функция - конструктор для значения по умолчанию

```javascript
combineReducers({
    user_name: boundReducer('SET_USER_NAME', String)
})
```

### boundApiReducer

Параметры:
* types - объект, описывающий стадии выполнения запроса (генерируется при помощи ApiAction или ApiActions) (обязательный)
* Constructor - функция - конструктор для значения по умолчанию (лучше всего, если конструктор будет описывать структуру ответа сервера) (обязательный)
* extendKey - функция - вормирующая ключ стэйта, если он не известен на этапе разработки, формируется из поля `action.params`, если не нужен, то вместо функции null
* prepare - функция, позволяющая обработать ответ перед тем как положить его в state

в качестве аргументов для `extendKey` и `prepare` передаются action и state

```javascript
combineReducers({
    todolist: boundApiReducer(GET_TODO_LIST, Array)
})
```

Состояние стэйта после начала запроса
```json
{
    "todolist": {
        "pending": true,
        "payload": [],
        "status": null,
        "error": null
    }
}
```