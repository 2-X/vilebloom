import pathlib
import os

def read_file(file_name):
    with open(os.path.join(pathlib.Path(__file__).parent.absolute(), file_name), "r") as file:
        data = file.read()
        return data
    
def write_file(data, file_name):
    with open(os.path.join(pathlib.Path(__file__).parent.absolute(), file_name), "w") as file:
        file.write(data)

def gen_theme(name):
    template = read_file("template.json")

    vilebloom_palette = [
        "#13212B",  # 0. background dark
        "#162733",  # 1. background light
        "#2C4459",  # 2. darkest blue
        "#EF7F7E",  # 3. red
        "#CD7F9A",  # 4. magenta
        "#F5BD9B",  # 5. sunset orange
        "#5483AA",  # 6. blue
        "#3C5E7A",  # 7. darker blue
        "#C5BCBA",  # 8. stone gray
        "#DFD9D8",  # 9. light gray
    ]

    replacements = {
        "One Dark Pro": name,
        "#282c34": vilebloom_palette[1], # background
        "#21252b": vilebloom_palette[0], # sidebar background
        "#98c379": vilebloom_palette[4], # string
        "#61afef": vilebloom_palette[6], # functions
        "#e06c75": vilebloom_palette[5], # variable names
        "#56b6c2": vilebloom_palette[3], # the cyan color for operators and such
        "#d19a66": vilebloom_palette[8], # undefined and such
        "#c678dd": vilebloom_palette[4], # that purple for keywords
        "#e5c07b": vilebloom_palette[8], # the yellow class names and keyword "this"
    }

    for search, replacement in replacements.items():
        template = template.replace(search, replacement)

    write_file(template, f"{name}.json")


if __name__ == "__main__":
    gen_theme("Vilebloom")
