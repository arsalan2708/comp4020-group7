
_itemID = 1

def create_item(name,userInfo):
    item = {
    "item_id": _itemID,
    "name": name,
    "quantity": 0,
    "additional_info": None,
    "added_by": userInfo,
    "categories": None # ["dairy","perishables"]
    }
    _itemID = _itemID+1
    return item


def item_edit(item,name=None, add_info=None, qty=None):
    if name is not None:
        item["name"] = name
    if add_info is not None:
        item["additional_info"] = add_info
    if qty is not None:
        item["quantity"] = qty


def item_toggleCat(item,cat):
    if item["categories"] is None:
        item["categories"] = cat
    else:
        for c in cat:
            if c in item["categories"]:
                item["categories"].remove(c)
            else:
                item["categories"].append(c)

 

