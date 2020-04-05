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
        "#13212B",  # 0.  background dark   - rgb(19,33,43)
        "#162733",  # 1.  background light  - rgb(22,39,51)
        "#2C4459",  # 2.  darkest blue      - rgb(44,68,89)
        "#EF7F7E",  # 3.  red               - rgb(239,127,126)
        "#CD7F9A",  # 4.  magenta           - rgb(205,127,154)
        "#F5BD9B",  # 5.  sunset orange     - rgb(245,189,155)
        "#5483AA",  # 6.  blue              - rgb(84,131,170)
        "#3C5E7A",  # 7.  darker blue       - rgb(60,94,122)
        "#C5BCBA",  # 8.  stone gray        - rgb(197,188,186)
        "#DFD9D8",  # 9.  light gray        - rgb(223,217,216)
        "#7FCF7C",  # 10. green            - rgb(127,207,124)
        "#4E5474",  # 11. purple
    ]

    replacements = {
        "One Dark Pro": name,
        "#282c34": vilebloom_palette[1],  # background
        "#21252b": vilebloom_palette[0],  # sidebar background
        "#98c379": vilebloom_palette[4],  # string
        "#61afef": vilebloom_palette[6],  # functions
        "#e06c75": vilebloom_palette[5],  # variable names
        "#56b6c2": vilebloom_palette[3],  # the cyan color for operators and such
        "#d19a66": vilebloom_palette[8],  # undefined and such
        "#c678dd": vilebloom_palette[4], # that purple for keywords
        "#e5c07b": vilebloom_palette[8],  # the yellow class names and keyword "this"
        "#abb2bf": vilebloom_palette[5],  # variables in Python
    }

    for search, replacement in replacements.items():
        template = template.replace(search, replacement)

    write_file(template, f"{name}.json")


if __name__ == "__main__":
    gen_theme("Vilebloom")
