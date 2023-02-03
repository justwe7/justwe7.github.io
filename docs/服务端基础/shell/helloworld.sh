#!/bin/bash
echo "Hello World !"

your_name="bill"
echo $your_name
echo ${your_name}

for file in `ls`; do
echo `${file}`
done


for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done

your_name="tom"
echo $your_name
your_name="alibaba"
echo $your_name

arr=(11 22 33)
echo ${arr[2]}
echo ${arr[@]}
echo ${#arr[@]}
echo ${#arr[*]}
echo ${#arr[0]}