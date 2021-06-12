#!/usr/bin/env python3
import os
from setuptools import setup, find_packages

requirements = [r.strip() for r in open("requirements.txt") if r.strip() and not r.strip().startswith("#")]


def read(ftext):
    return open(os.path.join(os.path.dirname(os.path.dirname(__file__)), ftext)).read()


setup(
    name="the-water-project",
    version="1.0",
    packages=find_packages(),
    license="MIT",
    description="the-water-project will help the community to save water",
    long_description=read("README"),
    author="Subhra264",
    author_email="chakrabortysubhradeep556@gmail.com",
    url="https://github.com/Subhra264/the-water-project",
    zip_safe=False,
    classifiers=[
        # complete classifier list: http://pypi.python.org/pypi?%3Aaction=list_classifiers
        "Intended Audience :: Science/Research",
        "Intended Audience :: Other Audience",
        "Environment :: Web Environment",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
    ],
    keywords=[
        "save water",
        "clean water",
    ],
    install_requires=requirements,
)
