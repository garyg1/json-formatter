# Simple JSON Formatter
A simple JavaScript program that formats JSON in a human-readable way. Uses a heuristic approach (no constraint optimization).

JSON is a human- and machine-readable data representation language. However, humans and machines make vastly different
spacing and wrapping decisions when writing it. There are many times when developers
in industry need to read large JSON objects (e.g. `az vm list-skus -l uswest --all`), and machine-formatted JSON is often not optimal for human readability. 

For example, consider the following simple JSON definition.
```json
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
```

Most JSON prettifiers (e.g., VSCode) will print
```json
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
```

Humans write JSON in a more natural and readable way. For example:
```jsonc
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
```

```jsonc
[
    1, 2, 3,
    [4, 5, [6, 7, 8]],
    "9"
]
```

```jsonc
[
    1, 2, 3,
    [
        4, 5,
        [6, 7, 8]
    ],
    "9"
]
```


## Prior Art
I did some quick Google searching (e.g. "json prettifier site:*.github.io") and looked at a few devs'
sites. They didn't fit the above use case. I decided it would take an hour to write my own, so that's what I did.

After writing this, I asked some friends for what they use:

* `prettier` exists and mostly does the same thing as this
* JSTool - https://www.sunjw.us/jstool/npp/ uses a different algorithm

## How it works
We use a simple heuristic that is good enough in most cases: wrap the top-most elements (closest to the root) first until the subtree can fit on a single line.

The general problem is a constrained optimization problem depending on the metric to optimize
(# of lines, # of expansions, etc.). But our heuristic works well enough in practical cases.

## Object Example
```
----------------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
--------------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
------------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
----------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
--------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
------------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
----------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
--------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
------------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
----------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
--------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
------------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
----------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
--------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
------------------------------------------------------------------------
{"the quick brown fox": {"jumps": "over", "the lazy": ["d", "o", "g"]}}
----------------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
--------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
------------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": ["d", "o", "g"]
    }
}
----------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d", "o", "g"
        ]
    }
}
--------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d", "o", "g"
        ]
    }
}
------------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d", "o", "g"
        ]
    }
}
----------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d", "o", "g"
        ]
    }
}
--------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
------------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
----------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
--------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
------------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
----------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
--------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
------------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
----------
{
    "the quick brown fox": {
        "jumps": "over",
        "the lazy": [
            "d",
            "o",
            "g"
        ]
    }
}
```

## Array Example
```
------------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-----------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
----------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
---------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
--------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
------------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-----------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
----------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
---------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
--------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
------------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-----------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
----------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
---------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
--------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
------------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-----------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
----------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
---------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
--------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
------------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
-----------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
----------------------------------
[1, 2, 3, [4, 5, [6, 7, 8]], "9"]
---------------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
--------------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
-------------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
------------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
-----------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
----------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
---------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
--------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
-------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
------------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
-----------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
----------------------
[
    1,
    2,
    3,
    [4, 5, [6, 7, 8]],
    "9"
]
---------------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [6, 7, 8]
    ],
    "9"
]
--------------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [6, 7, 8]
    ],
    "9"
]
-------------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [6, 7, 8]
    ],
    "9"
]
------------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [6, 7, 8]
    ],
    "9"
]
-----------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
----------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
---------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
--------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
-------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
------------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
-----------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
----------
[
    1,
    2,
    3,
    [
        4,
        5,
        [
            6,
            7,
            8
        ]
    ],
    "9"
]
```

