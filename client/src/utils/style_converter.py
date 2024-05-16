import os
import re

def html_style_to_jsx(html_string):
    # Define a regular expression pattern to match style attributes
    style_pattern = re.compile(r'style="([^"]*)"')

    def replace_style(match):
        # Function to replace style attributes with JSX style object
        style_string = match.group(1)
        # Split the style string into individual properties
        properties = re.findall(r'([\w-]+)\s*:\s*([^;]+)', style_string)
        # Convert properties to JSX style object
        jsx_style = "{{"
        for i, (prop, val) in enumerate(properties):
            # Convert hyphen-separated CSS property to camelCase
            prop = ''.join(word.capitalize() if i > 0 else word for i, word in enumerate(prop.split('-')))
            jsx_style += f"{prop}: '{val.strip()}'"
            if i < len(properties) - 1:
                jsx_style += ", "
        jsx_style += "}}"
        return f'style={jsx_style}'

    # Replace style attributes with JSX style object in the HTML string
    jsx_html = style_pattern.sub(replace_style, html_string)
    return jsx_html

# Get the directory of the Python script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Relative path to the HTML file
html_file_path = os.path.join(script_dir, "test.html")

# Read HTML file
with open(html_file_path, "r") as file:
    html_content = file.read()

# Convert HTML content to JSX with replaced style attributes
jsx_content = html_style_to_jsx(html_content)

# Write the JSX content back to the file
jsx_file_path = os.path.join(script_dir, "output_file.jsx")
with open(jsx_file_path, "w") as jsx_file:
    jsx_file.write(jsx_content)


# print(html_style_to_jsx("font-size: 26px; font-weight: 700; line-height: 1.4; color: rgb(34, 34, 34);"))
# print(html_style_to_jsx("background-color:rgba(249, 248, 248, 1)"))
# print(html_style_to_jsx("padding-top: 45px;"))
# print(html_style_to_jsx())
